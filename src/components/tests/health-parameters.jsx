import { Spin } from "antd";

function HealthParameters({ parameters, loading }) {
  return (
    <div className="bg-gray-200 mb-2 mt-6 p-3 rounded-md w-full sm:p-4 md:p-5 lg:p-6">
      {parameters.map(
        (
          { colors, description, icon: Icon, iconProps, name, value },
          index
        ) => (
          <Spin key={index} spinning={loading}>
            <div className="bg-white grid grid-cols-2 items-center mb-4 p-4 rounded-md w-full md:p-5 lg:p-6">
              <div className="flex xs:justify-center">
                <span
                  className={`${colors.border} border-4 border-solid flex items-center justify-center rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32`}
                >
                  <span
                    className={`${colors.text} relative top-[2px] text-3xl sm:text-4xl md:text-5xl`}
                  >
                    <Icon {...iconProps} />
                  </span>
                </span>
              </div>
              <div className="text-center w-full">
                <p className="capitalize font-bold mb-2 text-center text-gray-800 text-sm tracking-wide md:text-base">
                  {name}
                </p>
                <h1
                  className={`${colors.text} my-2 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
                >
                  {value}
                </h1>
                <p className="mt-2 text-center text-gray-600 text-xs md:text-sm">
                  {description}
                </p>
              </div>
            </div>
          </Spin>
        )
      )}
    </div>
  );
}

export default HealthParameters;
