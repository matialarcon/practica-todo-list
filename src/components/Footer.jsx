import { PendingCount } from "./PendingCount"
import { Filters } from "./Filters"
import { CompletedCount } from "./CompletedCount"

export function Footer({ filterSelected, setFilterSelected }) {
    return(
        <>
            <PendingCount />

            <Filters filterSelected={filterSelected} setFilterSelected={setFilterSelected} />

            <CompletedCount />
        </>
    )
}