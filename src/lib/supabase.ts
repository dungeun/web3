import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadImage = async (file: File, bucket: string = 'productimages') => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)
    
    if (error) throw error
    
    // 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteImage = async (url: string, bucket: string = 'productimages') => {
  try {
    // URL에서 파일명 추출
    const fileName = url.split('/').pop()
    if (!fileName) throw new Error('Invalid file URL')
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}