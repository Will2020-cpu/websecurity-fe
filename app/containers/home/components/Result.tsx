import { Response } from "~/domain/Response";

type Props = {
  response: Response | null;
};

export default function Result({ response }: Props) {
  console.log(response);
  function addColor(str: string): { color: string; state: string } {
    switch (str) {
      case "Medium (High)":
        return { color: "orange", state: "warning" };
      case "Medium (Medium)":
        return { color: "#71701f", state: "caution" };

      case "Low (High)":
        return { color: "blue", state: "info" };

      case "Low (Medium)":
        return { color: "green", state: "normal" };

      case "Informational (Low)":
        return { color: "grey", state: "note" };

      case "Informational (Medium)":
        return { color: "#283868", state: "minor" };

      default:
        return { color: "red", state: str };
    }
  }

  return (
    <main>
      <h1 className="text-white text-2xl font-medium">Alertas</h1>
      {response ? (
        <div className="flex flex-col w-full gap-3">
          <div>
            {response.site.map((item) => (
              <div
                className="flex flex-col w-full gap-3 mt-2"
                key={item["@name"]}
              >
                {item.alerts.map((alert) => {
                  const { color, state } = addColor(alert.riskdesc);
                  return (
                    <div
                      className="p-[15px] rounded shadow w-full flex flex-col gap-3 border border-[#1c2c3e]"
                      key={alert.cweid}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold truncate">
                          {alert.name}
                        </h3>
                        <span
                          className={`text-xs p-1 font-bold rounded-lg`}
                          style={{ backgroundColor: color }}
                        >
                          {alert.riskdesc}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-100">
                        {alert.desc.replace(/<\/?p>/g, "")}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          {Array.from({ length: 4 }).map((item, i) => (
            <div
              className="border border-[#1c2c3e] shadow rounded-md w-full p-[15px]"
              key={i}
            >
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
