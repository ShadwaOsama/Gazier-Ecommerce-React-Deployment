import React, { useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { request } from "../../axios/axios";
import { useQuery } from "react-query";
import Loading from "../../ui/Loading";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function OrderDashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /////////////start get All products///////////////
  function getAllProduct() {
    return request.get("/api/products");
  }
  let { isLoading, data, refetch } = useQuery("allProductDashboard", getAllProduct);
  /////////////end get All products///////////////

  /////////start delete product////////////
  async function handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((del) => {
      if (del) {
        request
          .delete(`/api/products/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((result) => {
            swal(result?.data?.message, {
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            swal(error?.response?.data?.message, {
              icon: "error",
            });
          });
      }
    });
  }
  /////////end delete product/////////////
  
  if (isLoading) return <Loading />;

  return (
    <div className="w-[95%] mx-auto mt-4 bg-[#FFF3DD] min-h-96 p-3 rounded-md">
      <div>
        <HeaderTable
          navigateTo={"/dashboard/addproductdashboard"}
          name={"Add New Product"}
          title={"Orders"}
          buttonClass="bg-orange-500 text-white"
        />
      </div>
      <div className="flex justify-end mt-1">
        <input
          type="text"
          className="border border-orange-500 rounded-md outline-none px-4 w-80 caret-slate-300 py-[1px]"
          placeholder="Search by name or category"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto mt-3 scrollbar overflow-y-auto h-[350px] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300">
        <table className="w-full text-sm text-[#1F1F1F]">
          <thead className="text-xs uppercase bg-[#FF8A52]">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Available</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {search === ""
              ? data &&
                data?.data
                  ?.slice()
                  .reverse()
                  .map((product) => (
                    <tr
                      key={product?._id}
                      className="odd:bg-[#FFDAC8] even:bg-[#FFE9DF] border-b"
                    >
                      <td className="px-6 py-4">{product?.name}</td>
                      <td className="px-6 py-4">{product?.category?.name}</td>
                      <td className="px-6 py-4">{product?.price}</td>
                      <td className="px-6 py-4">{product?.available}</td>
                      <td className="px-6 py-4">
                        <img src={product?.image} alt="product" className="w-14" />
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="font-medium text-red-600 border border-red-600 rounded-md px-2 py-1"
                          onClick={() => handleDelete(product?._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="font-medium text-blue-600 border border-blue-600 rounded-md px-2 py-1"
                          onClick={() =>
                            navigate(
                              `/dashboard/updateproductdashboard/${product?._id}`,
                              {
                                state: { data: product },
                              }
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
              : data?.data
                  ?.filter(
                    (e) =>
                      e?.name?.includes(search) || e?.category?.name?.includes(search)
                  )
                  .slice()
                  .reverse()
                  .map((product) => (
                    <tr
                      key={product?._id}
                      className="odd:bg-[#FFDAC8] even:bg-[#FFE9DF] border-b"
                    >
                      <td className="px-6 py-4">{product?.name}</td>
                      <td className="px-6 py-4">{product?.category?.name}</td>
                      <td className="px-6 py-4">{product?.price}</td>
                      <td className="px-6 py-4">{product?.available}</td>
                      <td className="px-6 py-4">
                        <img src={product?.image} alt="product" className="w-14" />
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="font-medium text-red-600 border border-red-600 rounded-md px-2 py-1"
                          onClick={() => handleDelete(product?._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="font-medium text-blue-600 border border-blue-700 rounded-md px-2 py-1"
                          onClick={() =>
                            navigate(
                              `/dashboard/updateproductdashboard/${product?._id}`,
                              {
                                state: { data: product },
                              }
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
