import { metricsTable } from '@/config/content';

export function MetricsTable() {
  return (
    <section className="section rule-top">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">{metricsTable.eyebrow}</p>
          <h2 className="font-display text-h2 font-medium">{metricsTable.heading}</h2>
          <p className="prose-measure text-sm text-ink-2">{metricsTable.footnote}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="nums w-full border-collapse text-sm">
            <thead>
              <tr className="text-left font-mono text-[0.6875rem] uppercase tracking-wider text-ink-3">
                <th className="border-b border-rule-strong py-2 pr-4 font-normal">Module</th>
                <th className="border-b border-rule-strong py-2 pr-4 font-normal">Metric</th>
                <th className="border-b border-rule-strong py-2 pr-4 font-normal">Value</th>
                <th className="border-b border-rule-strong py-2 pr-4 font-normal">Test</th>
                <th className="border-b border-rule-strong py-2 font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {metricsTable.rows.map((r, i) => {
                const first = i === 0 || metricsTable.rows[i - 1].module !== r.module;
                return (
                  <tr key={`${r.module}-${r.metric}`} className="align-top">
                    <td className={`py-2.5 pr-4 ${first ? 'border-t border-rule text-ink' : 'text-transparent'}`}>{r.module}</td>
                    <td className={`py-2.5 pr-4 text-ink-2 ${first ? 'border-t border-rule' : ''}`}>{r.metric}</td>
                    <td className={`whitespace-nowrap py-2.5 pr-4 font-medium text-ink ${first ? 'border-t border-rule' : ''}`}>{r.value}</td>
                    <td className={`py-2.5 pr-4 text-ink-2 ${first ? 'border-t border-rule' : ''}`}>{r.test}</td>
                    <td className={`whitespace-nowrap py-2.5 font-mono text-xs text-ink-3 ${first ? 'border-t border-rule' : ''}`}>{r.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
