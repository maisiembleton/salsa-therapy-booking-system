import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useState } from "react";
import { Button } from "../../components/Button";
import { FormElement } from "../../components/FormElement";
import { Modal } from "../../components/Modal";
import { useClasses } from "../../hooks/useClasses";

const TH: React.FC = ({ children }) => (
  <th className="align-bottom py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
    {children}
  </th>
);

const TD: React.FC<{ className?: string }> = ({ children, className }) => (
  <td
    className={`py-4 px-6 text-sm font-medium text-gray-900 align-top ${className}`}
  >
    {children}
  </td>
);

const Classes: NextPage = () => {
  const [classes, loading, error] = useClasses();
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  const onAddClassModal = () => {
    setShowAddClassModal(true);
  };

  return (
    <div className="m-6">
      <Modal
        show={showAddClassModal}
        onClose={() => setShowAddClassModal(false)}
        title={<>Add a class</>}
        bodyContent={
          <div>
            <FormElement name="name" label="Name" />
            <FormElement
              name="description"
              label="Description"
              type="textarea"
            />
            <FormElement name="duration" label="Duration" type="number" />
            <FormElement name="weekday" label="Weekday" type="weekday" />
            <FormElement name="startDate" label="Start Date" type="calendar" />
            <FormElement name="endDate" label="End Date" type="calendar" />
            <FormElement name="maxPeople" label="Max People" type="number" />
            <FormElement name="price" label="Price" type="number" />
            <FormElement name="stripeId" label="Stripe Id" />
          </div>
        }
        footerContent={
          <>
            <Button>Add</Button>
            <Button
              appearance="secondary"
              onClick={() => setShowAddClassModal(false)}
            >
              Cancel
            </Button>
          </>
        }
      />
      <div className="float-right">
        <Button onClick={onAddClassModal}>
          <PlusIcon className="h-4 w-4 inline-block" /> Add class
        </Button>
      </div>
      <h1 className="font-bold text-6xl mb-8 tracking-tight">Manage Classes</h1>

      {loading && <div>Loading classes...</div>}

      {(classes?.length || 0) > 0 && (
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <TH>Name</TH>
                      <TH>Description</TH>
                      <TH>Duration</TH>
                      <TH>Weekday</TH>
                      <TH>Start Date</TH>
                      <TH>End Date</TH>
                      <TH>Max People</TH>
                      <TH>Price</TH>
                      <TH>Stripe Id</TH>
                      <TH>Actions</TH>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {classes?.map((x) => (
                      <tr className="hover:bg-gray-100">
                        <TD>{x.name}</TD>
                        <TD>{x.description}</TD>
                        <TD>{x.duration}</TD>
                        <TD>{x.weekday}</TD>
                        <TD>{dayjs(x.startDate).format("D MMMM YYYY")}</TD>
                        <TD>{dayjs(x.endDate).format("D MMMM YYYY")}</TD>
                        <TD>{x.maxPeople}</TD>
                        <TD>{x.price}</TD>
                        <TD className="w-5 truncate text-ellipsis">
                          {x.stripeId}
                        </TD>
                        <TD className="flex gap-2">
                          <Button>
                            <PencilIcon className="w-4 h-4 inline-block" /> Edit
                          </Button>
                          <Button>
                            <TrashIcon className="w-4 h-4 inline-block" />{" "}
                            Delete
                          </Button>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;