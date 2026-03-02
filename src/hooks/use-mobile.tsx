import * as React from "react"

const MOBILE_BREAKPOINT = 640
const TABLET_BREAKPOINT = 1024

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface DeviceInfo {
  deviceType: DeviceType
  screenSize: { width: number; height: number }
  isSmallPhone: boolean
  isLargePhone: boolean
  isSmallTablet: boolean
  isLargeTablet: boolean
}

export function useDeviceType(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>({
    deviceType: 'desktop',
    screenSize: { width: 0, height: 0 },
    isSmallPhone: false,
    isLargePhone: false,
    isSmallTablet: false,
    isLargeTablet: false
  })

  React.useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      let deviceType: DeviceType = 'desktop'
      if (width < MOBILE_BREAKPOINT) {
        deviceType = 'mobile'
      } else if (width < TABLET_BREAKPOINT) {
        deviceType = 'tablet'
      }

      const isSmallPhone = width < 375
      const isLargePhone = width >= 414 && width < 480
      const isSmallTablet = width >= 640 && width < 768
      const isLargeTablet = width >= 768 && width < 1024

      setDeviceInfo({
        deviceType,
        screenSize: { width, height },
        isSmallPhone,
        isLargePhone,
        isSmallTablet,
        isLargeTablet
      })
    }

    updateDeviceInfo()
    window.addEventListener('resize', updateDeviceInfo)
    return () => window.removeEventListener('resize', updateDeviceInfo)
  }, [])

  return deviceInfo
}

// Backward compatibility
export function useIsMobile() {
  const { deviceType } = useDeviceType()
  return deviceType === 'mobile'
}
