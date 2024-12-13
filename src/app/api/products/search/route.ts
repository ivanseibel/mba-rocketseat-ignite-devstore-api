import type { NextRequest } from 'next/server'
import data from '../data.json'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const searchParams = request.nextUrl.searchParams
  const query = z.string().parse(searchParams.get('q'))

  if (!query) {
    return Response.json({ message: 'Query is required' }, { status: 400 })
  }

  const products = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  )

  return Response.json(products)
}
