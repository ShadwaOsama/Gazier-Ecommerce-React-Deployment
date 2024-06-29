import React, { useEffect} from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateUserDashboard() {
  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  /////////////////////////////
  useEffect(() => {
    if (state?.data) {
      setValue("name", state.data.name || "");
      setValue("email", state.data.email || "");
      setValue("phone", state.data.phone || "");
      setValue("postalCode", state.data.postalCode || "");
      setValue("street", state.data.street || "");
      setValue("city", state.data.city || "");
      setValue("country", state.data.country || "");
    }
  }, [state, setValue]);
  //////////////////////
  async function onSubmit(data) {
    await request
      .patch(`/api/users/${id}`, data)
      .then( ( result ) => {
        console.log(result)
        if (result?.data?._id) {
          toast.success("user update successfuly");
          navigate("/dashboard/userdashboard");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.error));
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"updateUser"} />
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
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <small className="text-red-400">{errors.email.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">phone</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="phone"
            {...register("phone", {
              required: "phone is required",
              minLength: {
                value: 10,
                message: "phone must be at least 10 number",
              },
            })}
          />
          {errors.phone && (
            <small className="text-red-400">{errors.phone.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">postal Code</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="postal Code"
            {...register("postalCode", {
              required: "postalCode is required",
            })}
          />
          {errors.postalCode && (
            <small className="text-red-400">{errors.postalCode.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">street</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="street"
            {...register("street", {
              required: "street is required",
            })}
          />
          {errors.street && (
            <small className="text-red-400">{errors.street.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">city</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="city"
            {...register("city", {
              required: "city is required",
            })}
          />
          {errors.city && (
            <small className="text-red-400">{errors.city.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">country</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="country"
            {...register("country", {
              required: "country is required",
            })}
          />
          {errors.country && (
            <small className="text-red-400">{errors.country.message}</small>
          )}
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
