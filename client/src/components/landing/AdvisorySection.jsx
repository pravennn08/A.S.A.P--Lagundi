import { Card, CardContent, CardFooter } from "../ui/Card";
import { Info } from "lucide-react";

const AdvisorySection = () => {
  return (
    <section className="mt-16 px-6 lg:px-12">
      <div className="w-full max-w-[1200px] mx-auto">
        <Card size="lg" className="rounded-2xl border bg-amber-50/50 ">
          <CardContent className="p-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 text-amber-500 p-2 rounded-full">
                <Info size={18} />
              </div>

              <h3 className="text-sm font-semibold tracking-wide text-amber-500 uppercase">
                Community Advisory
              </h3>
            </div>

            <p className="text-gray-700 text-md leading-relaxed">
              Help us keep our community safe. Please report only genuine
              incidents. Filing false or misleading reports may result in
              administrative sanctions, fines, or legal action from the Barangay
              Lagundi office.
            </p>
          </CardContent>

          <CardFooter className="border-amber-200 bg-transparent p-0 pt-4 text-amber-500 text-sm font-medium">
            Thank you for your honesty and cooperation.
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AdvisorySection;
