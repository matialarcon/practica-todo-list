import { filterOptions } from "../consts"

export function Filters({ filterSelected, setFilterSelected }) {
    return(
        <div>
            <ul className="filters">
                {filterOptions.map(option => (
                    <li key={option.id}>
                        <a href="#" className={filterSelected === option.name ? 'selected' : ''} onClick={(event) => {
                            event.preventDefault()
                            setFilterSelected(option.name)
                        }}>
                            {option.name}
                        </a>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}