export interface ITourPackage {
  _id: string
  title: string
  description: string
  images: string[]
  location: string
  costFrom: number
  startDate: string
  endDate: string
  departureLocation: string
  arrivalLocation: string
  included: string[]
  excluded: string[]
  amenities: string[]
  tourPlan: TourPlan[]
  maxGuest: number
  minAge: number
  division: string
  tourType: string
  createdAt: string
  updatedAt: string
  slug: string
}

export interface TourPlan {
  day: number
  title: string
  _id: string
}