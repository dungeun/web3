import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Get all site configurations
      const configs = await prisma.siteConfig.findMany()
      
      // Convert to key-value object
      const configObject = configs.reduce((acc, config) => {
        acc[config.key] = config.value
        return acc
      }, {} as Record<string, string>)
      
      return res.status(200).json(configObject)
    }
    
    if (req.method === 'PUT' || req.method === 'POST') {
      const { key, value } = req.body
      
      if (!key || value === undefined) {
        return res.status(400).json({ error: 'Key and value are required' })
      }
      
      // Update or create the configuration
      const config = await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
      
      return res.status(200).json(config)
    }
    
    if (req.method === 'PATCH') {
      // Bulk update configurations
      const configs = req.body as Array<{ key: string; value: string }>
      
      if (!Array.isArray(configs)) {
        return res.status(400).json({ error: 'Expected array of configurations' })
      }
      
      // Update all configurations
      const updates = await Promise.all(
        configs.map(({ key, value }) =>
          prisma.siteConfig.upsert({
            where: { key },
            update: { value },
            create: { key, value }
          })
        )
      )
      
      return res.status(200).json(updates)
    }
    
    res.setHeader('Allow', ['GET', 'PUT', 'POST', 'PATCH'])
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Site config API error:', error)
    return res.status(500).json({ 
      error: 'Server error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
}