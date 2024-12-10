import React from "react";

const Card = ({ image, date, title, description, onClick }) => {
  return (
    <article
      className="overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        alt={title}
        src={
          image ||
          "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        }
        className="h-56 w-full object-cover"
      />

      <div className="bg-white p-4 sm:p-6">
        <time dateTime={date} className="block text-xs text-gray-500">
          {date || "No date provided"}
        </time>

        <h3 className="mt-0.5 text-lg text-gray-900">{title || "No title available"}</h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {description || "No description available"}
        </p>
      </div>
    </article>
  );
};

export default Card;
