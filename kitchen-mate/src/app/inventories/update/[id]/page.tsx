import React from "react";
import Head from "next/head";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export interface Update {
    params: {
      id: string;
    };
  }

const UpdateInventory = ({ params }: Update) => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const stock = formData.get("stock");
    const expired = formData.get("expired");

    await fetch(`http://localhost:3000/api/inventories/update/${params.id}`, {
      method: "PUT",
      headers: {
        Cookie: cookies().toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock, expired }),
    });

    redirect("/inventories");
  };
  return (
    <>
      <Head>
        <title>Add Inventory | KitchenMate</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Content container */}
        <main className="flex-grow container mx-auto p-4">
          {/* Card container */}
          <div className="card bg-base-100 shadow-xl rounded p-6 max-w-2xl mx-auto my-8">
            {/* Card title */}
            <h2 className="text-center mb-8 mt-8 text-3xl font-bold">
              Update Your Ingredients
            </h2>
            {/* Form container */}
            <form action={handleSubmit}>
              <div className="card-body">
                {/* Input fields */}
                

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Stock</span>
                  </label>
                  <input
                    type="text"
                    name="stock"
                    placeholder="Enter Stock"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Expiration Date</span>
                  </label>
                  <input
                    type="text"
                    name="expired"
                    placeholder="Enter expired"
                    className="input input-bordered"
                  />
                </div>

                {/* Submit button */}
                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white">Send</button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default UpdateInventory;
