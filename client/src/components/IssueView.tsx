// client/src/components/IssueView.tsx
import React, { useEffect, useState } from "react";
import IssueFields, { IssueShape } from "./IssueFields";

export default function IssueView({
  id,
  issue: initialIssue,
  onClose,
}: {
  id?: string | null;
  issue?: IssueShape | null;
  onClose: () => void;
}) {
  const [issue, setIssue] = useState<IssueShape | null>(initialIssue ?? null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // If an issue object was provided, don't fetch
    if (initialIssue) return;
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const res = await fetch(`/api/issues/${id}`);
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(
            json?.message || `Failed to fetch (status ${res.status})`
          );
        }
        const data = await res.json();
        if (!cancelled) setIssue(data);
      } catch (e: any) {
        if (!cancelled) setErr(e.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, initialIssue]);

  // If neither id nor initialIssue provided, do not render anything
  if (!id && !initialIssue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Issue details</h3>
          <button
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="p-6">
          {loading && <div className="text-sm text-gray-500">Loading…</div>}
          {err && <div className="text-sm text-red-600">Error: {err}</div>}
          {!loading && !err && issue && <IssueFields issue={issue} />}
        </div>

        <div className="p-4 border-t text-right">
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
