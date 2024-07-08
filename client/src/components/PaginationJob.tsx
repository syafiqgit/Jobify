import { useLocation, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Job } from "@/lib/types/job.type";

interface Props {
  current_page: number;
  total_pages: number;
  jobs: Job[];
}

export default function PaginationJob(props: Props) {
  const { current_page, total_pages, jobs } = props;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber: string) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <PaginationLink
        isActive={activeClass}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber.toString())}
      >
        {pageNumber}
      </PaginationLink>
    );
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: current_page === 1 })
    );

    if (current_page > 3) {
      pageButtons.push(<PaginationEllipsis />);
    }
    if (current_page !== 1 && current_page !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: current_page - 1,
          activeClass: false,
        })
      );
    }
    if (current_page !== 1 && current_page !== total_pages) {
      pageButtons.push(
        addPageButton({
          pageNumber: current_page,
          activeClass: true,
        })
      );
    }

    if (current_page !== total_pages && current_page !== total_pages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: current_page + 1,
          activeClass: false,
        })
      );
    }
    if (current_page < total_pages - 2) {
      pageButtons.push(<PaginationEllipsis />);
    }

    if (total_pages > 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: total_pages,
          activeClass: current_page === total_pages,
        })
      );
    }

    return pageButtons;
  };
  return (
    <>
      {jobs.length > 0 && (
        <Pagination className="pt-4 flex justify-start">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => {
                let prevPage = current_page - 1;
                if (prevPage < 1) prevPage = total_pages;
                handlePageChange(prevPage.toString());
              }}
            />
            {renderPageButtons()}
            <PaginationNext
              onClick={() => {
                let nextPage = current_page + 1;
                if (nextPage > total_pages) nextPage = 1;
                handlePageChange(nextPage.toString());
              }}
            />
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
