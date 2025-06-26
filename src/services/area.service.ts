// src/services/area.service.ts
import axios from 'axios'
import type { Area } from '@/types/area'

export async function getAllAreas(): Promise<Area[]> {
  const { data } = await axios.get<Area[]>('/api/areas')
  return data
}
