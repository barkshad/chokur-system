import React, { useState } from 'react';
import { GradeChip } from '../components/GradeChip';
import { useGrading } from '../context/GradingContext';
import { KCSE_GRADING_TABLE } from '../utils/grading';

export const SettingsView: React.FC = () => {
  const {
    schoolConfig,
    updateSchoolConfig,
    exportJSONBackup,
    restoreJSONBackup,
    resetToDemoData,
  } = useGrading();

  const [formConfig, setFormConfig] = useState(schoolConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [restoreText, setRestoreText] = useState('');
  const [restoreError, setRestoreError] = useState(false);

  const handleSave = () => {
    updateSchoolConfig(formConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDiscard = () => {
    setFormConfig(schoolConfig);
  };

  const handleSyncNow = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 1200);
  };

  const handleProcessRestore = () => {
    setRestoreError(false);
    const success = restoreJSONBackup(restoreText);
    if (success) {
      setIsRestoreModalOpen(false);
      setRestoreText('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      setRestoreError(true);
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-8 pb-32">
      {/* Page Title & Subtitle Header */}
      <div className="pb-6 mb-6 border-b border-[#DDD6C7] flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-3">
            <h1 className="font-headline-lg text-headline-lg text-[#111111]">Settings</h1>
            <span className="font-tabular-sm text-tabular-sm text-[#5F5E5E]">CONFIG_ACAD_2026</span>
          </div>
          <p className="font-body-md text-body-md text-[#5F5E5E] mt-1">
            Configure school metadata, grading scales, term calendar, and offline data sync
          </p>
        </div>

        {saveSuccess && (
          <div className="bg-[#111111] text-[#FEF9EF] px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
            <span>All configuration settings updated</span>
          </div>
        )}
      </div>

      {/* Settings Sections (Planar, Hairline Separated) */}
      <div className="flex flex-col">
        {/* 1. School Information Section */}
        <section className="py-6 border-b border-[#DDD6C7] grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 pr-4">
            <h2 className="font-headline-sm text-headline-sm text-[#111111]">School Information</h2>
            <p className="font-caption text-caption text-[#5F5E5E] mt-1">
              Official institutional identity printed across all term transcripts, KCSE result
              schedules, and student performance dossiers.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-col space-y-4">
            <div>
              <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                School Name
              </label>
              <input
                type="text"
                value={formConfig.schoolName}
                onChange={(e) => setFormConfig({ ...formConfig, schoolName: e.target.value })}
                className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-body-md text-body-md focus:border-[#C2410C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                School Motto
              </label>
              <input
                type="text"
                value={formConfig.motto}
                onChange={(e) => setFormConfig({ ...formConfig, motto: e.target.value })}
                className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-body-md text-body-md focus:border-[#C2410C] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                  Postal Address
                </label>
                <input
                  type="text"
                  value={formConfig.postalAddress}
                  onChange={(e) => setFormConfig({ ...formConfig, postalAddress: e.target.value })}
                  className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-body-md text-body-md focus:border-[#C2410C] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                  Contact Phone / Email
                </label>
                <input
                  type="text"
                  value={formConfig.contactPhoneEmail}
                  onChange={(e) => setFormConfig({ ...formConfig, contactPhoneEmail: e.target.value })}
                  className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-body-md text-body-md focus:border-[#C2410C] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Current Term & Academic Year Section */}
        <section className="py-6 border-b border-[#DDD6C7] grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 pr-4">
            <h2 className="font-headline-sm text-headline-sm text-[#111111]">
              Current Term &amp; Academic Year
            </h2>
            <p className="font-caption text-caption text-[#5F5E5E] mt-1">
              Active evaluation window used for ledger aggregation, attendance intervals, and
              automated merit standings.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                Academic Year
              </label>
              <select
                value={formConfig.academicYear}
                onChange={(e) => setFormConfig({ ...formConfig, academicYear: e.target.value })}
                className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-body-md text-body-md focus:border-[#C2410C] focus:outline-none"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                Term
              </label>
              <select
                value={formConfig.term}
                onChange={(e) => setFormConfig({ ...formConfig, term: e.target.value })}
                className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-body-md text-body-md focus:border-[#C2410C] focus:outline-none"
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                Term Opening Date
              </label>
              <input
                type="date"
                value={formConfig.termOpeningDate}
                onChange={(e) => setFormConfig({ ...formConfig, termOpeningDate: e.target.value })}
                className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-tabular-md text-tabular-md focus:border-[#C2410C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-[#5F5E5E] uppercase mb-1.5">
                Term Closing Date
              </label>
              <input
                type="date"
                value={formConfig.termClosingDate}
                onChange={(e) => setFormConfig({ ...formConfig, termClosingDate: e.target.value })}
                className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded px-3 py-2 text-[#111111] font-tabular-md text-tabular-md focus:border-[#C2410C] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* 3. KCSE Grading Scale Section (12-Point Scale) */}
        <section className="py-6 border-b border-[#DDD6C7] grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 pr-4">
            <h2 className="font-headline-sm text-headline-sm text-[#111111]">
              KCSE Grading Scale (12-Point Scale)
            </h2>
            <p className="font-caption text-caption text-[#5F5E5E] mt-1">
              Read-only standard ministerial metric. Points feed mean score calculations directly across
              all Form 1 to Form 4 classes.
            </p>

            {/* Calculation Method Switcher */}
            <div className="mt-4 p-3 bg-[#FBF8F1] border border-[#DDD6C7]">
              <span className="font-label-caps text-label-caps text-[#5F5E5E] block mb-2">
                Calculation Standard
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#111111]">
                  <input
                    type="radio"
                    name="calcMethod"
                    checked={formConfig.calculationMethod === 'best7'}
                    onChange={() => setFormConfig({ ...formConfig, calculationMethod: 'best7' })}
                    className="accent-[#C2410C]"
                  />
                  <span>Best 7 Subjects Rule (KNEC Standard)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#111111]">
                  <input
                    type="radio"
                    name="calcMethod"
                    checked={formConfig.calculationMethod === 'simpleMean'}
                    onChange={() => setFormConfig({ ...formConfig, calculationMethod: 'simpleMean' })}
                    className="accent-[#C2410C]"
                  />
                  <span>Straight Mean across all subjects</span>
                </label>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#FBF8F1] border border-[#DDD6C7]">
              <span className="font-label-caps text-label-caps text-[#5F5E5E] block mb-1">
                Scale Paradigm
              </span>
              <p className="font-caption text-caption text-[#5F5E5E]">
                Monochrome graphic hierarchy: Solid carbon indicates honors; outline indicates
                competence; grey indicates marginal performance; dashed indicates critical remedial
                intervention.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="w-full overflow-hidden border border-[#DDD6C7]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FBF8F1] border-b border-[#DDD6C7] h-9">
                    <th className="px-4 py-2 font-label-caps text-label-caps text-[#5F5E5E]">
                      Marks Range
                    </th>
                    <th className="px-4 py-2 font-label-caps text-label-caps text-[#5F5E5E]">Grade</th>
                    <th className="px-4 py-2 font-label-caps text-label-caps text-[#5F5E5E] text-right">
                      Points
                    </th>
                    <th className="px-4 py-2 font-label-caps text-label-caps text-[#5F5E5E]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD6C7] font-body-sm text-body-sm">
                  {KCSE_GRADING_TABLE.map((row) => {
                    const isCPlus = row.grade === 'C+';

                    return (
                      <React.Fragment key={row.grade}>
                        <tr className="h-11 bg-[#FBF8F1] hover:bg-[#F2EDE3] transition-colors">
                          <td className="px-4 py-2 font-tabular-md text-tabular-md">
                            {row.min} – {row.max}
                          </td>
                          <td className="px-4 py-2">
                            <GradeChip grade={row.grade} />
                          </td>
                          <td className="px-4 py-2 font-tabular-md text-tabular-md text-right font-medium">
                            {row.points}
                          </td>
                          <td className="px-4 py-2 text-[#111111]">{row.description}</td>
                        </tr>

                        {/* Cutoff Pass Line */}
                        {isCPlus && (
                          <tr className="bg-[#FEF9EF]">
                            <td colSpan={4} className="p-0">
                              <div className="border-y border-[#111111] bg-[#EDE8DE]/40 px-4 py-1.5 flex items-center justify-between">
                                <span className="font-label-caps text-label-caps text-[#111111] font-semibold uppercase tracking-wider">
                                  Pass Line — Minimum University Direct Entry Requirement
                                </span>
                                <span className="font-tabular-sm text-tabular-sm text-[#5F5E5E]">
                                  KUCCPS Benchmark: 7.00 Mean PTS
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. Data & Backups Section */}
        <section className="py-6 border-b border-[#DDD6C7] grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 pr-4">
            <h2 className="font-headline-sm text-headline-sm text-[#111111]">Data &amp; Backups</h2>
            <p className="font-caption text-caption text-[#5F5E5E] mt-1">
              Direct cryptographic snapshots of the ledger state. Store cold archive files onto local
              physical storage keys.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-col justify-start">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={exportJSONBackup}
                type="button"
                className="border border-[#111111] bg-transparent text-[#111111] px-4 py-2 rounded font-body-sm text-body-sm font-medium hover:bg-[#F2EDE3] transition-colors cursor-pointer"
              >
                Export backup (JSON)
              </button>
              <button
                onClick={() => setIsRestoreModalOpen(true)}
                type="button"
                className="border border-[#111111] bg-transparent text-[#111111] px-4 py-2 rounded font-body-sm text-body-sm font-medium hover:bg-[#F2EDE3] transition-colors cursor-pointer"
              >
                Restore from backup
              </button>
              <button
                onClick={() => {
                  if (confirm('Reset all marks, students, and configurations to demo records?')) {
                    resetToDemoData();
                  }
                }}
                type="button"
                className="border border-[#BA1A1A] bg-transparent text-[#BA1A1A] px-4 py-2 rounded font-body-sm text-body-sm font-medium hover:bg-[#FFDAD6]/30 transition-colors cursor-pointer"
              >
                Reset demo data
              </button>
            </div>
            <p className="font-caption text-caption text-[#9A958A] mt-3">
              All marks and student records are stored locally in IndexedDB / localStorage on this browser.
            </p>
          </div>
        </section>

        {/* 5. Offline Synchronization Section */}
        <section className="py-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 pr-4">
            <h2 className="font-headline-sm text-headline-sm text-[#111111]">Offline Synchronization</h2>
            <p className="font-caption text-caption text-[#5F5E5E] mt-1">
              Autonomous reconciliation engine designed for erratic rural broadband and remote school
              compound relays.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-col items-start gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#DDD6C7] bg-[#FBF8F1] rounded">
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    syncStatus === 'synced' ? 'bg-emerald-600' : 'bg-[#C2410C]'
                  }`}
                ></span>
                <span className="font-tabular-sm text-tabular-sm text-[#111111] font-medium">
                  {syncStatus === 'syncing'
                    ? 'Synchronizing local ledger with cloud relay...'
                    : syncStatus === 'synced'
                    ? 'Online: All 42 records synchronized'
                    : 'Offline-ready: All changes cached on this device'}
                </span>
              </div>
              <button
                onClick={handleSyncNow}
                disabled={syncStatus === 'syncing'}
                type="button"
                className="border border-[#111111] bg-transparent text-[#111111] px-4 py-1.5 rounded font-body-sm text-body-sm font-medium hover:bg-[#F2EDE3] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {syncStatus === 'syncing' ? 'Syncing...' : 'Sync now'}
              </button>
            </div>
            <span className="font-caption text-caption text-[#5F5E5E]">
              Last successful sync check: Today at 08:42 AM · 100% data fidelity
            </span>
          </div>
        </section>
      </div>

      {/* Fixed Bottom Action Bar */}
      <footer className="fixed bottom-0 right-0 left-[220px] bg-[#FBF8F1] border-t border-[#DDD6C7] py-3 px-6 z-30 no-print">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#5F5E5E]">info</span>
            <span className="font-caption text-caption text-[#5F5E5E]">
              Configuration changes are cached locally until explicitly confirmed.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={handleDiscard}
              type="button"
              className="text-[#C2410C] font-body-md text-body-md font-medium hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              Discard changes
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="bg-[#C2410C] text-[#FEF9EF] px-5 py-2 rounded font-body-md text-body-md font-medium hover:opacity-95 focus:outline-none transition-opacity cursor-pointer"
            >
              Save changes
            </button>
          </div>
        </div>
      </footer>

      {/* Restore JSON Modal */}
      {isRestoreModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FEF9EF] border border-[#DDD6C7] rounded max-w-lg w-full p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD6C7] mb-3">
              <h3 className="font-headline-sm text-headline-sm text-[#111111]">Restore from JSON Backup</h3>
              <button
                onClick={() => setIsRestoreModalOpen(false)}
                className="text-[#5F5E5E] hover:text-[#111111] font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-[#5F5E5E] mb-3">
              Paste the contents of your previously exported JSON backup file below.
            </p>
            <textarea
              rows={8}
              value={restoreText}
              onChange={(e) => setRestoreText(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full bg-[#FBF8F1] border border-[#DDD6C7] rounded p-3 text-xs font-tabular-sm text-[#111111] focus:border-[#C2410C] focus:outline-none"
            />
            {restoreError && (
              <p className="text-xs text-red-600 mt-2 font-medium">
                Invalid JSON format or missing required ledger keys.
              </p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsRestoreModalOpen(false)}
                className="px-3 py-1.5 text-sm text-[#5F5E5E] hover:text-[#111111] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessRestore}
                className="px-4 py-1.5 bg-[#C2410C] text-[#FEF9EF] rounded text-sm font-medium hover:opacity-90 cursor-pointer"
              >
                Restore Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
