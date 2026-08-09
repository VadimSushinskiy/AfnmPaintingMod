import { ModScreenFC } from "afnm-types";
import { PaintingScreenBase } from "./PaintingScreenBase";
import { trialListBf } from "../../trials/trialListBf";
import { modFlags } from "../../flags";

export const PaintingScreenBf: ModScreenFC = ({ screenAPI }) => {
    return <PaintingScreenBase screenAPI={screenAPI} trialsList={trialListBf} trialNumberFlag={modFlags.bfTrialsNumer}/>
}