"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const maxButtons = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Lógica para mostrar um número limitado de botões com elipses
  let pagesToShow: (number | "...")[] = pages;
  if (totalPages > maxButtons) {
    const start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages, start + maxButtons - 1);

    pagesToShow = pages.slice(start - 1, end);
    
    if (start > 1) {
      pagesToShow = [1, "...", ...pagesToShow];
    }
    
    if (end < totalPages) {
      pagesToShow = [...pagesToShow, "...", totalPages];
    }
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>

      {pagesToShow.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-8 min-w-[2rem] rounded-lg px-2 text-sm transition-colors",
              currentPage === page
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {page}
          </button>
        )
      )}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
      </Button>
    </div>
  );
}