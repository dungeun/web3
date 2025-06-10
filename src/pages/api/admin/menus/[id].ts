import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const menuId = parseInt(id as string)

  if (isNaN(menuId)) {
    return res.status(400).json({ error: 'Invalid menu ID' })
  }

  switch (req.method) {
    case 'GET':
      try {
        const menu = await prisma.menu.findUnique({
          where: { id: menuId }
        })
        
        if (!menu) {
          return res.status(404).json({ error: 'Menu not found' })
        }
        
        res.status(200).json(menu)
      } catch (error) {
        console.error('Error fetching menu:', error)
        res.status(500).json({ error: 'Failed to fetch menu' })
      }
      break

    case 'PATCH':
      try {
        const menu = await prisma.menu.update({
          where: { id: menuId },
          data: req.body
        })
        
        res.status(200).json(menu)
      } catch (error) {
        console.error('Error updating menu:', error)
        res.status(500).json({ error: 'Failed to update menu' })
      }
      break

    case 'DELETE':
      try {
        // 먼저 하위 메뉴 삭제
        await prisma.menu.deleteMany({
          where: { parentId: menuId }
        })
        
        // 메인 메뉴 삭제
        await prisma.menu.delete({
          where: { id: menuId }
        })
        
        res.status(200).json({ message: 'Menu deleted successfully' })
      } catch (error) {
        console.error('Error deleting menu:', error)
        res.status(500).json({ error: 'Failed to delete menu' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}