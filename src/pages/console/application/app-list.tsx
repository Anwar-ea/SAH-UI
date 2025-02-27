import React, { useEffect, useState } from "react";
import { Card, Button, Popconfirm, Empty, message } from "antd";
import { EditOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { IApplication } from "../../../models/interfaces/Response/applicatipon";
import { useMutation } from "react-query";
import { IFetchRequest } from "../../../models/interfaces/request/fetch-request";
import { applicationService } from "../../../services/application.service";
import { useNavigate } from "react-router-dom";

const AppList: React.FC = () => {
    const [deleteLoading, setDeleteLoading] = useState<Record<string, boolean>>({});
    const [applications, setApplications] = useState<Array<IApplication>>([]);
    const redirect = useNavigate();
    useEffect(() => {
        getAllMutation.mutate({});
    }, [])
    const getAllMutation = useMutation((fetchRequest: IFetchRequest<IApplication> = {}) => applicationService.getRecords(fetchRequest), {
        onSuccess: (x) => {
            setApplications(x.data);
        },
        onError: (err) => {

        }
    });

    const deletMutation = useMutation((id: string) => applicationService.deleteRecord(id), {
        onSuccess: (x) => {
            getAllMutation.mutate({});
            message.success('Application deleted successfully.')
        },
        onError: (err) => {
            message.success('An error ocured while deleting Application.')

        }
    });

    const onDelete = (id: string) => {
        deletMutation.mutate(id);
    }

    const onEdit = (id: string) => {
        redirect(`/console/app/edit/${id}`);
    }

    const handleDelete = async (id: string) => {
      try {
        setDeleteLoading((prev) => ({ ...prev, [id]: true }));
        await onDelete(id);
        message.success("Application deleted successfully");
      } catch (error) {
        message.error("Failed to delete application");
        console.error(error);
      } finally {
        setDeleteLoading((prev) => ({ ...prev, [id]: false }));
      }
    };
  
    const handleCardClick = (application: IApplication) => {
        redirect(`/console/app/analytics/${application.id}`)
    };
  
    if (!applications.length) {
      return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-center py-6">
                <Button type="primary" onClick={() => {
                    redirect('/console/app/add');
                }}>Add Application</Button>
            </div>
        <div className="w-full flex justify-center items-center p-8">
          <Empty description="No applications found" />
        </div>
        </div>
      );
    }
  
    return (
        <>
        <div className="flex flex-col justify-between">
            <div className="flex justify-center py-6">
                <Button type="primary" onClick={() => {
                    redirect('/console/app/add');
                }}>Add Application</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {applications.map((app) => (
                <Card
                    key={app.id}
                    hoverable
                    className="h-full flex flex-col"
                    cover={
                    app.imageUrl ? (
                        <div 
                        className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                        onClick={() => handleCardClick(app)}
                        >
                        <img
                            alt={app.name}
                            src={app.imageUrl}
                            className="w-full h-full object-cover"
                        />
                        </div>
                    ) : (
                        <div 
                        className="h-40 bg-gray-100 flex items-center justify-center"
                        onClick={() => handleCardClick(app)}
                        >
                        <span className="text-4xl text-gray-400">
                            {app.name.charAt(0).toUpperCase()}
                        </span>
                        </div>
                    )
                    }
                    actions={[
                    <Button
                        key="edit"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                        e.stopPropagation();
                        onEdit(app.id);
                        }}
                    >
                        Edit
                    </Button>,
                    <Popconfirm
                        key="delete"
                        title="Are you sure you want to delete this application?"
                        onConfirm={(e) => {
                        e?.stopPropagation();
                        handleDelete(app.id);
                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                    >
                        <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        loading={deleteLoading[app.id]}
                        onClick={(e) => e.stopPropagation()}
                        >
                        Delete
                        </Button>
                    </Popconfirm>,
                    ]}
                    style={{ paddingTop: 12, paddingBottom: 12, flex: 1 }}
                    onClick={() => handleCardClick(app)}
                >
                    <div className="flex flex-col h-full">
                    <div className="text-lg font-medium truncate mb-1">{app.name}</div>
                    {app.url && (
                        <div className="flex items-center text-blue-500 text-sm mb-2 truncate">
                        <LinkOutlined className="mr-1" />
                        <span className="truncate">{app.url}</span>
                        </div>
                    )}
                    </div>
                </Card>
                ))}
            </div>
        </div>
        </>
    );
  };

export default AppList;
