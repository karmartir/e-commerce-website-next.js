"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  ControllerRenderProps,
  SubmitHandler,
  useForm,
  type Resolver,
} from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import slugify from "slugify";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { Textarea } from '../ui/textarea';
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
// import { Checkbox } from '../ui/checkbox';

type ProductFormValues = z.infer<typeof insertProductSchema>;

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(insertProductSchema) as Resolver<ProductFormValues>,
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });
  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "name"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "slug"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter slug"
                      {...field}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* {category} */}
          {/* {brand} */}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* {Price} */}
          {/* {Stock} */}
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* {images} */}
        </div>
        <div className="upload-field">{/*isFeatured*/}</div>
        <div className="upload-field">{/*Description*/}</div>
        <div className="upload-field">{/*Submit*/}</div>
      </form>
    </Form>
  );
};

export default ProductForm;
