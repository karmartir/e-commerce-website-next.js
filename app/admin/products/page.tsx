import React from 'react'
import { requireAdmin } from "@/lib/auth-guard";

const ProductsPage = async () => {
  await requireAdmin();
  return (
    <div>
      Products test page here
    </div>
  )
}

export default ProductsPage
