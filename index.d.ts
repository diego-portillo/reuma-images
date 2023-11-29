type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type TImageId = string

type TImageAttributes = {
  description: string
  desease: string
  approvalDate: Date
  approvedBy: string
}

type TImage = {
  id: TImageId
  name: string
  uploadDate: Date
  uploadedBy: string
  url: string
  attributes: TImageAttributes
  approved: boolean
}

type TAPIReumaDetailResponse = TImage

type TAPIReumaResponse = {
  length: number
  data: TImage[]
  error?: string
}
