import React from "react";
import Head from "next/head";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const AddInventory = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const stock = formData.get("stock");
    const images = formData.get("images");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const expired = formData.get("expired");

    await fetch("http://localhost:3000/api/inventories/create", {
      method: "POST",
      headers: {
        Cookie: cookies().toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, stock, images, category, tags, expired }),
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
              Add Your Ingredients
            </h2>
            {/* Form container */}
            <form action={handleSubmit}>
              <div className="card-body">
                {/* Input fields */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Inventory Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Inventory"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Stock</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Enter Stock"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Image</span>
                  </label>
                  <input
                    type="text"
                    name="images"
                    placeholder="Enter Image"
                    className="input input-bordered"
                  />
                </div>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text"><b>Category</b></span>
                  </div>
                  <select name="category" className="select select-bordered">
                    <option disabled value="">Select Category</option>
                    <option value="Daging">Daging</option>
                    <option value="Sayur">Sayur</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Frozen Food">Frozen Food</option>
                  </select>
                </label>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Tags</span>
                  </label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter tags"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Expiration Date</span>
                  </label>
                  <input
                    type="date"
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

export default AddInventory;
