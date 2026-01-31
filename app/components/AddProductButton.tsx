"use client";

import React from "react";

export default function AddProductButton() {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        const modal = document.getElementById("add-product-modal") as HTMLDialogElement | null;
        if (modal) modal.showModal();
      }}
    >
      + Add New Product
    </button>
  );
}