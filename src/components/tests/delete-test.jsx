import { Button, Popconfirm } from "antd";
import React from "react";

import { useNotificationContext } from "../../store/contexts";
import { useDeleteTestMutation } from "../../store/features/api/tests";

function DeleteTest({ children, testId: id, onSuccess, ...props }) {
  const [open, setOpen] = React.useState(false);

  const { api } = useNotificationContext();
  const [DeleteTest, { error, status, isLoading }] = useDeleteTestMutation();

  const handleDelete = React.useCallback(() => {
    DeleteTest(id);
  }, [DeleteTest, id]);

  React.useEffect(() => {
    if (error && status === "rejected")
      api.error({
        message: `Sorry, could not delete test!`,
        description: error.message,
      });
    else if (status === "fulfilled") {
      if (onSuccess) onSuccess();
      setOpen(false);
      api.success({
        message: "Test deleted successfully.",
      });
    }
  }, [api, status, error, onSuccess]);

  return (
    <Popconfirm
      title="Delete Test"
      description="Do you wish to delete this test?"
      open={open}
      onConfirm={handleDelete}
      okButtonProps={{ loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      onCancel={() => setOpen(false)}
      okType="danger"
    >
      <Button
        shape="circle"
        type="ghost"
        disabled={isLoading}
        onClick={() => setOpen(true)}
        {...props}
      >
        {children}
      </Button>
    </Popconfirm>
  );
}

export default DeleteTest;
