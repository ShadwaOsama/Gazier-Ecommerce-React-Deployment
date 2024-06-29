import React, { useEffect, useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const { state } = useLocation();

  const [uplaodImageLocal, setUploadImageLocal] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  ////////////start upload image///////////
  function handleChangeImage(e) {
    setUploadImageLocal(e.target.files[0]);
  }

  /////////////end upload image///////
  /////////////////////////////
  useEffect(() => {
    if (state?.data) {
      setValue("name", state.data.name || "");
      setValue("price", state.data.price || "");
      setValue("description", state.data.description || "");
      setValue("available", state.data.available || "");
      setValue("brand", state.data.brand || "");
    }
  }, [state, setValue]);
  //////////////////////
  async function onSubmit(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", state.data.category._id);
    formData.append("description", data.description);
    formData.append("available", data.available);
    formData.append("brand", data.brand);
    if (uplaodImageLocal) {
      formData.append("image", uplaodImageLocal);
    }

    await request
      .patch(`/api/products/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result?.data?._id) {
          toast.success("product update successfuly");
          navigate("/dashboard/productdashboard");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.error));
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"update product"} />
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Name"
            {...register("name", { required: "name is required" })}
          />
          {errors.name && (
            <small className="text-red-400">{errors.name.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">price</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="price"
            {...register("price", { required: "price is required" })}
          />
          {errors.price && (
            <small className="text-red-400">{errors.price.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Description</label>
          <textarea
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Description"
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.description && (
            <small className="text-red-400">{errors.description.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">brand</label>
          <select
            name=""
            id=""
            {...register("brand", {
              required: "brand is required",
            })}
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
          >
            <option value="">choose the brand</option>
            <option value="Tornado">Tornado</option>
            <option value="Beko">Beko</option>
            <option value="Bosch">Bosch</option>
            <option value="Sonai">Sonai</option>
            <option value="Black & Decker">Black & Decker</option>
            <option value="Braun">Braun</option>
          </select>

          {errors.brand && (
            <small className="text-red-400">{errors.brand.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="updateCategory" className="cursor-pointer">
            image
          </label>
          <input
            type="file"
            id="updateCategory"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px] "
            onChange={handleChangeImage}
          />
        </div>
        <div>
          <button
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold hover:bg-purple-700"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "is Loading..." : "update"}
          </button>
        </div>
      </div>
    </div>
  );
}
