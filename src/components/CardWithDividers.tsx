const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
]

export default function CardWithDividers() {
    return (
        <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
            <ul role="list" className="divide-y divide-gray-300">
                {items.map((item) => (
                    <li key={item.id} className=""></li>
                ))}
            </ul>
        </div>
    )
}
