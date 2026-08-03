import Link from "next/link";



export default function AdminPage() {

  return (

    <div className="min-h-screen bg-gray-900 text-white p-8">

      <div className="max-w-3xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-indigo-400">Admin Dashboard - German Academy</h1>

        <p className="text-gray-300">താഴെ പറയുന്ന ഓപ്ഷനുകളിൽ ഒന്ന് തിരഞ്ഞെടുക്കുക:</p>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Placement Test Button */}

          <Link

            href="/admin/placement-test"

            className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow hover:border-indigo-500 transition flex flex-col justify-between"

          >

            <div>

              <h2 className="text-xl font-semibold text-indigo-300 mb-2">പ്ലേസ്മെന്റ് ടെസ്റ്റ്</h2>

              <p className="text-gray-400 text-sm">പ്ലേസ്മെന്റ് ടെസ്റ്റിനുള്ള ചോദ്യങ്ങൾ ചേർക്കാനും മാനേജ് ചെയ്യാനും ഇവിടെ ക്ലിക്ക് ചെയ്യുക.</p>

            </div>

            <span className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-center text-sm font-medium transition">

              ചോദ്യങ്ങൾ ചേർക്കുക &rarr;

            </span>

          </Link>



          {/* Add Lessons Button */}

          <Link

            href="/admin/lessons"

            className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow hover:border-green-500 transition flex flex-col justify-between"

          >

            <div>

              <h2 className="text-xl font-semibold text-green-300 mb-2">കോഴ്സ് പാഠങ്ങൾ (Lessons)</h2>

              <p className="text-gray-400 text-sm">ലെവലുകളും ഡേ 1 മുതൽ ഡേ 16 വരെയുള്ള പാഠഭാഗങ്ങളും അപ്ഡേറ്റ് ചെയ്യാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യുക.</p>

            </div>

            <span className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center text-sm font-medium transition">

              പാഠങ്ങൾ ചേർക്കുക &rarr;

            </span>

          </Link>

        </div>

      </div>

    </div>

  );

}

