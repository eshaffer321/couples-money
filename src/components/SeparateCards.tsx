import BudgetMonthCard from "./BudgetMonthCard";

const items = [
    { id: 1 },
    {id: 2}
    // More items...
]

export default function SeparateCards(props: any) {
    if (props.isLoading) {
        return "Loading..."
    }

    if (props.error) {
        return "Error"
    }
    
    return (
        <ul role="list" className="space-y-4">
            {items.map((item) => (
                <li key={item.id} className="overflow-hidden bg-white shadow rounded-md py-5 px-4">
                    <BudgetMonthCard></BudgetMonthCard>
                </li>
            ))}
        </ul>
    )
}
