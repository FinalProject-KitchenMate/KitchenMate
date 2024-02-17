
export default function CardMyRecipe() {
  return (
    <>
      <div className='rounded-3xl shadow-xl mb-4' style={{ height: '380px' }}>

        <div className="grid rounded-3xl shadow-sm flex-col">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            className="rounded-t-3xl justify-center grid h-60 object-cover"
            alt="recipe.title"
          />
          <div className="group p-4 grid z-10">
            <div className="font-bold text-sm line-clamp-2 mb-4">Recipe Title
              <span className="text-sm flex gap-x-20 font-bold text-black-600 dark:text-300 transition-all duration-300 hover:text-blue-500 mt-4">
                <button className="btn btn-outline btn-primary btn-sm">Detail Recipe</button>
                <button className="btn btn-outline btn-primary btn-sm">Delete Recipe</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}