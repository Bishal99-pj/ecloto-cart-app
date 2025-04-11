type ProgressBarProps = {
    progress: number,
    threshold: number,
    subTotal: number
}

const ProgressBar = (props: ProgressBarProps) => {
    const { progress, subTotal, threshold } = props
    return (
        <div className="my-4">
            <div className="flex justify-between mb-2">
                <span>Progress To Free Gift</span>
                <span>
                    ${subTotal.toFixed(2)} / {threshold.toFixed(2)}
                </span>
            </div>
            <div className="w-full bg-gray-50 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}>
                </div>
            </div>
            <p className="text-sm mt-2">
                {subTotal < threshold ? `Add $${(threshold - subTotal).toFixed(2)} more to get a free gift!` : "Free gift unlocked!"}
            </p>
        </div>
    )
}

export default ProgressBar