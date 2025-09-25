import { Button } from "@/components/ui/button";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { User } from "@/drizzle/schema";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("accountType", {
    header: "Account Type",
    cell: info => (
      <span className="capitalize">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: info => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        info.getValue() === "active" ? "bg-green-100 text-green-800" :
        info.getValue() === "pending" ? "bg-yellow-100 text-yellow-800" :
        info.getValue() === "blocked" ? "bg-red-100 text-red-800" :
        "bg-gray-100 text-gray-800"
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: props => {
      const user = props.row.original;
      const isPending = user.status === "pending";
      const isBlocked = user.status === "blocked";

      return (
        <div className="flex items-center gap-2">
          {isPending && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => props.table.options.meta?.approveUser(user.id)}
            >
              Approve
            </Button>
          )}
          <Button
            variant={isBlocked ? "secondary" : "danger"}
            size="sm"
            onClick={() => props.table.options.meta?.toggleBlockUser(user.id)}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => props.table.options.meta?.deleteUser(user.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  }),
];

interface UsersTableProps {
  data: User[];
  approveUser: (id: string) => void;
  toggleBlockUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

export function UsersTable({ data, approveUser, toggleBlockUser, deleteUser }: UsersTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      approveUser,
      toggleBlockUser,
      deleteUser,
    },
  });

  return (
    <div className="rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}