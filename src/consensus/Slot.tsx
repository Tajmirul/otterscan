import { FC, Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import StandardFrame from "../StandardFrame";
import SlotSubtitle from "./slot/SlotSubtitle";
import NavTab from "../components/NavTab";
import AttestationsTabTitle from "./slot/AttestationsTabTitle";
import Overview from "./slot/Overview";
import Attestations from "./slot/Attestations";
import { SelectionContext, useSelection } from "../useSelection";

const Slot: FC = () => {
  const { slotNumber } = useParams();
  if (slotNumber === undefined) {
    throw new Error("slotNumber couldn't be undefined here");
  }
  const slotAsNumber = parseInt(slotNumber);
  const selectionCtx = useSelection();

  return (
    <StandardFrame>
      <SlotSubtitle slotNumber={slotAsNumber} />
      <SelectionContext.Provider key={slotAsNumber} value={selectionCtx}>
        <Tab.Group>
          <Tab.List className="flex space-x-2 border-l border-r border-t rounded-t-lg bg-white">
            <NavTab href=".">Overview</NavTab>
            <NavTab href="attestations">
              <AttestationsTabTitle slotNumber={slotAsNumber} />
            </NavTab>
          </Tab.List>
        </Tab.Group>
        <Suspense fallback={null}>
          <Routes>
            <Route index element={<Overview />} />
            <Route path="attestations" element={<Attestations />} />
          </Routes>
        </Suspense>
      </SelectionContext.Provider>
    </StandardFrame>
  );
};

export default Slot;
