// client/src/components/IssueFields.tsx
import React from "react";

export type IssueShape = {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  impact?: string;
  status?: string;
  expectedFixDate?: string | null; // ISO string or ""
  createdAt?: string | null;
  updatedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
};

function FieldRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b last:border-b-0">
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="col-span-2 text-sm text-gray-900 break-words">
        {value && value !== "" ? (
          value
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </div>
    </div>
  );
}

export default function IssueFields({ issue }: { issue: IssueShape }) {
  const fmtDate = (iso?: string | null) => {
    try {
      if (!iso) return "";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleString();
    } catch {
      return "";
    }
  };

  const fmtDateShort = (iso?: string | null) => {
    try {
      if (!iso) return "";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleDateString();
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-2">
      <FieldRow label="Title" value={issue.title} />
      <FieldRow label="Type" value={issue.type} />
      <FieldRow label="Description" value={issue.description} />
      <div className="grid grid-cols-3 gap-4 py-3 border-b">
        <div className="text-sm font-medium text-gray-600">Impact</div>
        <div className="text-sm text-gray-900 col-span-2">
          {issue.impact ?? <span className="text-gray-400">—</span>}
        </div>
      </div>
      <FieldRow label="Status" value={issue.status} />
      <FieldRow
        label="Expected Fix Date"
        value={fmtDateShort(issue.expectedFixDate)}
      />
      <FieldRow label="Created At" value={fmtDate(issue.createdAt)} />
      <FieldRow label="Updated At" value={fmtDate(issue.updatedAt)} />
      <FieldRow label="Created By" value={issue.createdBy ?? ""} />
      <FieldRow label="Updated By" value={issue.updatedBy ?? ""} />
    </div>
  );
}
