// app/account/page.tsx
import { Metadata } from "next";
import AccountLayout from "./AccountLayout";
import AccountWelcome from "./AccountWelcome";  // Client component for name

export const metadata: Metadata = {
  title: "My Account | Hamid Oil Flour and Dal Mill",
};

export default function AccountPage() {
  return (
    <AccountLayout>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto p-8">
          <AccountWelcome />  {/* Dynamic welcome with name */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">My Profile</h2>
                <p>Update your name, email, phone</p>
                <div className="card-actions justify-end">
                  <a href="/account/profile" className="btn btn-primary">
                    Edit Profile →
                  </a>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Delivery Addresses</h2>
                <p>Manage your home, work, and courier point addresses</p>
                <div className="card-actions justify-end">
                  <a href="/account/addresses" className="btn btn-primary">
                    Manage Addresses →
                  </a>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Change Password</h2>
                <p>Keep your account secure</p>
                <div className="card-actions justify-end">
                  <a href="/account/password" className="btn btn-primary">
                    Change Password →
                  </a>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">My Orders</h2>
                <p>View order history and status</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled>Coming Soon</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}