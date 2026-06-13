import { useCategories } from "../hooks/useCategories";

export const Categories = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { categories } = useCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        Kategoriyalar
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-5 py-3 rounded-lg whitespace-nowrap ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Barchasi
        </button>

        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-3 rounded-lg whitespace-nowrap ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};