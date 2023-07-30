import {
  ExclamationCircleOutlined,
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Result, Skeleton } from "antd";
import React from "react";

import Container from "../../../components/container";
import TestsForm from "../../../components/tests/form";
import Table from "../../../components/tests/table";
import { resetParameters } from "../../../firebase/database";
import { useGetTestsQuery } from "../../../store/features/api/tests";

function Tests() {
  const { data, error, refetch, isFetching, isLoading } = useGetTestsQuery();

  const modalRef = React.useRef();

  return (
    <Container
      alert={
        error?.message
          ? {
              type: "error",
              title: "Error: Failed to Load.",
              message: error.message,
              // close: clearError,
            }
          : undefined
      }
      title="Tests and Diagnosis"
    >
      <div className="sm:flex sm:items-center">
        <div className="my-2 w-full sm:mr-2 sm:my-0 sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Button
            block
            icon={
              <span className="mr-2 text-sm md:text-base">
                <PlusOutlined />
              </span>
            }
            onClick={() => {
              if (modalRef.current) modalRef.current.openModal();
              resetParameters();
            }}
            size="large"
          >
            <span className="text-sm md:text-base">New Test</span>
          </Button>
        </div>
        <div className="my-2 w-full sm:ml-2 sm:my-0 sm:w-1/2 md:ml-4 md:w-1/3 lg:w-1/4">
          <Button
            block
            disabled={isFetching}
            loading={isFetching}
            onClick={refetch}
            icon={
              <span className="mr-2 text-gray-700 text-sm md:text-base">
                <UndoOutlined />
              </span>
            }
            size="large"
          >
            <span className="text-sm text-gray-700 md:text-base">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="my-2 py-4">
        {isLoading ? (
          <Skeleton active />
        ) : data && data.length > 0 ? (
          <Table data={data} />
        ) : (
          <Result
            icon={
              <span className="text-primary-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                <ExclamationCircleOutlined />
              </span>
            }
            title="There are no tests/dianosis."
            extra={
              <Button
                icon={
                  <span className="mr-2 text-sm md:text-base">
                    <PlusOutlined />
                  </span>
                }
                size="large"
                type="primary"
                onClick={() => {
                  if (modalRef.current) modalRef.current.openModal();
                  resetParameters();
                }}
              >
                <span className="text-sm md:text-base">Conduct one now</span>
              </Button>
            }
          />
        )}
      </div>

      <TestsForm ref={modalRef} />
    </Container>
  );
}

export default Tests;
