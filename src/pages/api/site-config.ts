import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get all site configurations
    const configs = await prisma.siteConfig.findMany()
    
    // Convert to key-value object
    const configObject = configs.reduce((acc, config) => {
      acc[config.key] = config.value
      return acc
    }, {} as Record<string, string>)
    
    return res.status(200).json(configObject)
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