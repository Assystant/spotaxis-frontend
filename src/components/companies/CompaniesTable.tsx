
import { Building2, MapPin, Link, Mail, Phone, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Company = {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
};

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp",
    industry: "Technology",
    location: "San Francisco, CA",
    website: "https://techcorp.example.com",
    email: "contact@techcorp.example.com",
    phone: "+1 (555) 123-4567",
    status: "Active"
  },
  {
    id: "2",
    name: "DesignStudio",
    industry: "Design",
    location: "New York, NY",
    website: "https://designstudio.example.com",
    email: "info@designstudio.example.com",
    phone: "+1 (555) 987-6543",
    status: "Active"
  },
  {
    id: "3",
    name: "SaaS Inc.",
    industry: "Software",
    location: "Austin, TX",
    website: "https://saas.example.com",
    email: "hello@saas.example.com",
    phone: "+1 (555) 456-7890",
    status: "Active"
  },
  {
    id: "4",
    name: "CloudTech",
    industry: "Cloud Services",
    location: "Seattle, WA",
    website: "https://cloudtech.example.com",
    email: "support@cloudtech.example.com",
    phone: "+1 (555) 234-5678",
    status: "Active"
  },
  {
    id: "5",
    name: "MediaCo",
    industry: "Media",
    location: "Los Angeles, CA",
    website: "https://mediaco.example.com",
    email: "media@mediaco.example.com",
    phone: "+1 (555) 876-5432",
    status: "Inactive"
  }
];

export const CompaniesTable = () => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-subtle overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">Companies</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {company.industry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {company.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    company.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
