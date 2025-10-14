import { useMemo } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router";
import { useLedgerStore } from "@/store/ledger";
import { goAddBill, showBillEditor } from "./bill-editor";
import { showSettings } from "./settings";

export default function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentTab = useMemo(() => {
        return ["/stat", "/", "/search"].find((x) => location.pathname === x);
    }, [location.pathname]);

    const switchTab = (value: "/" | "/stat" | "/search") => {
        navigate(`${value}`);
    };

    return createPortal(
        <div
            className="floating-tab fixed w-screen h-18 flex items-center justify-around sm:h-screen
         sm:w-18 sm:flex-col sm:justify-start z-0 
         bottom-[calc(.25rem+env(safe-area-inset-bottom))]
         sm:top-[env(safe-area-inset-top)] sm:left-[calc(.25rem+env(safe-area-inset-left))]"
        >
            {/* search */}
            <button
                type="button"
                className={`w-14 h-14 sm:w-10 sm:h-10 cursor-pointer flex items-center justify-center rounded-full shadow-md m-2  transition-all hover:bg-gray-200 active:bg-gray-300 ${
                    currentTab === "/search" ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => switchTab("/search")}
            >
                <i className="icon-[mdi--search] size-5"></i>
            </button>

            {/* middle group */}
            <div className="flex items-center rounded-full p-1 bg-white w-56 h-14 m-2 shadow-md sm:flex-col sm:w-10 sm:h-50 sm:-order-1">
                <button
                    type="button"
                    className={`flex-1 h-full w-full transition rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 active:bg-gray-300 ${
                        currentTab === "/" ? "bg-gray-300" : ""
                    }`}
                    onClick={() => switchTab("/")}
                >
                    <i className="icon-[mdi--format-align-center] size-5"></i>
                </button>

                <button
                    type="button"
                    className="w-18 h-18 sm:w-14 sm:h-14 rounded-full bg-stone-900 shadow-md flex items-center justify-center m-1 cursor-pointer transform transition-all hover:scale-105"
                    onClick={goAddBill}
                >
                    <i className="icon-[mdi--add] text-[white] size-7"></i>
                </button>

                <button
                    type="button"
                    className={`flex-1 h-full w-full transition-all rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 active:bg-gray-300 ${
                        currentTab === "/stat" ? "bg-gray-300" : ""
                    }`}
                    onClick={() => switchTab("/stat")}
                >
                    {/* <div className="transform translate-x-[25%] translate-y-[-25%]"> */}
                    <i className="icon-[mdi--chart-box-outline] size-5"></i>
                    {/* </div> */}
                </button>
            </div>

            {/* settings */}
            <button
                type="button"
                className="w-14 h-14 sm:w-10 sm:h-10 cursor-pointer flex items-center justify-center rounded-full shadow-md m-2 bg-white transition-all hover:bg-gray-200 active(bg-gray-300"
                onClick={() => {
                    showSettings();
                }}
            >
                <i className="icon-[mdi--more-horiz] size-5"></i>
            </button>
        </div>,
        document.body,
    );
}
