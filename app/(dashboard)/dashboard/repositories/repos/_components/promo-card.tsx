function PromoCard() {
  return (
    <div className="col-span-1 rounded-xl border bg-muted p-6 md:col-span-2 xl:col-span-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="text-xs font-medium text-orange-500">SAHARA INSIGHT</p>
          <h3 className="mt-2 text-xl font-semibold">Integrate AI Reviewer</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Let Sahara’s intelligence layer scan your code for architectural
            improvements and performance bottlenecks automatically.
          </p>

          <button className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white">
            Learn More
          </button>
        </div>

        {/* Image Placeholder */}
        <div className="h-40 w-40 rounded-lg bg-background shadow-sm" />
      </div>
    </div>
  )
}

export default PromoCard
