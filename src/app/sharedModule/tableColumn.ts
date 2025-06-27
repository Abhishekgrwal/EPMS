import { format } from 'path';

export const userCol = [
  {
    key: 'firstName',
    label: 'First Name',
    sort: true,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    sort: true,
  },
  {
    key: 'role',
    label: 'Role',
    sort: true,
  },
  {
    key: 'email',
    label: 'Email',
    sort: true,
  },
  {
    key: 'createdOn',
    label: 'Created On',
    type: 'date',
    format: 'dd-MMM-yyyy',
    sort: true,
  },
  {
    key: 'action',
    label: 'Actions',
    type: 'action',
    hideIf: (row: any) => row.role === 'Admin',
    sort: false,
    actions: [
      {
        icon: `<span class="material-symbols-outlined">
border_color
</span>`,
        tooltip: 'Edit User',
        event: 'edit',
      },
      {
        icon: ` <span class="material-symbols-outlined">
delete
</span>`,
        tooltip: 'Delete User',
        event: 'delete',
      },
    ],
  },
];

export const projectCol = [
  {
    key: 'name',
    label: 'Name',
    sort: true,
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'startDate',
    label: 'Start Date',
    format: 'dd-MMM-yyyy',
    type: 'date',
    sort: true,
  },
  {
    key: 'endDate',
    label: 'End Date',
    format: 'mediumDate',
    type: 'date',
    sort: true,
  },
  {
    key: 'assignedUsers',
    label: 'Assigned User',
    sort: true,
  },

  {
    key: 'action',
    label: 'Actions',
    type: 'action',
    actions: [
      {
        icon: `<span class="material-symbols-outlined">
border_color
</span>`,
        tooltip: 'Edit Project',
        event: 'edit',
      },
      {
        icon: `<span class="material-symbols-outlined">
delete
</span>`,
        tooltip: 'Delete Project',
        event: 'delete',
      },
      {
        icon: `<span class="material-symbols-outlined">
add
</span>`,
        tooltip: 'Add Project',
        event: 'addTask',
      },
    ],
  },
];
