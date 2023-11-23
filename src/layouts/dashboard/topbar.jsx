import { useSelector } from "react-redux";

// function getName(
// 	name1: string | null,
// 	name2: string | null,
// 	email: string
// ): string {
// 	if (name1 && name2) return name1 + ' ' + name2;
// 	if (name1) return name1;
// 	if (name2) return name2;
// 	return email;
// }

const Topbar = () => {
  const auth = useSelector((state) => state.auth.data);

  return (
    <section className="hidden bg-white container items-center justify-between mx-auto relative shadow-lg p-2 lg:flex lg:p-4 w-full">
      <span className="h-[40px] inline-block w-[250px]">
        <img
          className="h-full w-full"
          src="/images/vitalcare-logo.png"
          alt="Vitalcare"
        />
      </span>
      <div className="flex items-center justify-end w-full">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 text-sm md:text-base">
            {auth.displayName || auth.email}
          </span>
          <span className="ml-2 text-lg">
            <span className="bg-primary-500 h-10 inline-flex items-center justify-center rounded-full text-gray-50 w-10">
              {auth?.image ? (
                <img
                  className="h-full rounded-full w-full"
                  src={auth.image}
                  alt={auth?.displayName?.[0] || auth.email[0]}
                />
              ) : (
                <span className="left-[0.05rem] relative top-[0.075rem]">
                  {auth?.displayName?.[0] || auth.email[0]}
                </span>
              )}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
