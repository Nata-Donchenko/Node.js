interface Preference {
  emailEnabled?: boolean;
  smsEnabled?: boolean;
}

interface User {
  readonly id: number;
  readonly createdAt: Date;
  email: string ;
  phone?: string;
  role: 'admin' | 'user' | 'guest';
  preferences?: Preference;
}

const admin: User = {
  id: 1,
  createdAt: new Date(),
  email: 'admin@gmail.com',
  phone: '+380932349182',
  role: 'admin',
  preferences: {
    emailEnabled: true,
    smsEnabled: true,
  }
}

const guest: User = {
  id: 2,
  createdAt: new Date(),
  email: 'guest@gmail.com',
  role: 'guest',
}

// admin.id = 3; error TS2540: Cannot assign to 'id' because it is a read-only property.
// admin.role = 'moderator' error TS2322: Type '"moderator"' is not assignable to type '"admin" | "guest" | "user"'.
// guest.age = 25 error TS2339: Property 'age' does not exist on type 'User'.
// guest.email = 3 error TS2322: Type 'number' is not assignable to type 'string'.

interface Admin extends User {
  role: 'admin';
  permissions: readonly string[];
}

const superAdmin: Admin = {
  id: 1,
  createdAt: new Date(),
  email: 'admin@gmail.com',
  phone: '+380932349182',
  role: 'admin',
  preferences: {
    emailEnabled: true,
    smsEnabled: true,
  },
  permissions: ['manage users', 'manage products', 'view reports'],
}

//superAdmin.permissions.push("new permission"); error TS2339: Property 'push' does not exist on type 'readonly string[]'.

type WithStringId = { id: string; label: string };
type WithNumberId = { id: number; count: number };

type Broken = WithStringId & WithNumberId;

//const broken: Broken = { id: 111, label: '...', count: 1 }; error TS2322: Type 'number' is not assignable to type 'never'.

type SafeMerge = Omit<WithStringId, 'id'> & WithNumberId

const merged: SafeMerge = {id: 5, label: 'test', count: 5}
//const merged2: SafeMerge = {id: '5', label: 'test', count: 5} error TS2322: Type 'string' is not assignable to type 'number'.


