import React from 'react';
import Head from 'next/head';

const AddInventory = () => {
  return (
    <>
      <Head>
        <title>Add Inventory | KitchenMate</title>
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Content container */}
        <main className="flex-grow container mx-auto p-4">
          {/* Card container */}
          <div className="card bg-base-100 shadow-xl rounded p-6 max-w-2xl mx-auto my-8">
            {/* Card title */} 
            <h2 className="text-center mb-8 mt-8 text-3xl font-bold">Add Your Ingredients</h2>
            <p className="text-center mb-8 mt-8">Here you can add your ingredients</p>

            {/* Form container */}
            <div className="card-body">
              {/* Input fields */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Inventory Name</span>
                </label>
                <input type="text" placeholder="Enter Inventory" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stock</span>
                </label>
                <input type="text" placeholder="Enter Stock" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input type="text" placeholder="Enter Image" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input type="text" placeholder="Enter category" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tags</span>
                </label>
                <input type="text" placeholder="Enter tags" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Expiration Date</span>
                </label>
                <input type="text" placeholder="Enter expired" className="input input-bordered" />
              </div>

              {/* Submit button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddInventory;
