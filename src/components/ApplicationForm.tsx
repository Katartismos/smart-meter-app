import type { FormProps } from '../lib/types'

const ApplicationForm = ({ formData, handleInputChange, handleSubmit }: FormProps) => {

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Account Number */}
        <div>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="sr-only" htmlFor="meterType">Meter Type</label>
          <select
            id="meterType"
            name="meterType"
            value={formData.meterType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white text-gray-600 appearance-none"
          >
            <option value="" disabled>Meter Type (Dropdown)</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Installation Address */}
      <div>
        <label className="sr-only" htmlFor="address">Installation Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Installation Address"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-[0.99] mt-4"
      >
        SUBMIT APPLICATION
      </button>
    </form>
  )
}

export default ApplicationForm