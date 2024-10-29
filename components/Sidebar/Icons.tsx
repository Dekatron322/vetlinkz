import Image from "next/image"
import Link from "next/link"

export const LogoIcon = () => (
  <section>
    <Link href="/dashboard" className="icon-style content-center">
      <Image
        src="https://raw.githubusercontent.com/Dekatron322/vetlinks/10ab72d326aa0cfefd29c9f846e348ce19dd68ce/public/AuthImages/collapsed.svg"
        width={128}
        height={43}
        alt="dekalox"
      />
    </Link>
  </section>
)

export const CollapsedLogoIcon = () => (
  <section>
    <Link href="/" className="icon-style content-center">
      <Image src="./AuthImages/logoSmall.svg" width={40} height={43} alt="dekalo" />
    </Link>
    <Link href="/" className="dark-icon-style content-center">
      <Image src="./AuthImages/logoSmall.svg" width={40} height={43} alt="dekalo" />
    </Link>
  </section>
)

export const DashboardIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "./AuthImages/Globe.svg" : "./AuthImages/Globe.svg"} alt="Dashboard" width={20} height={20} />
)

export const EstatesIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "./AuthImages/Users.svg" : "./AuthImages/Users.svg"} alt="Estates" width={20} height={20} />
)

export const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "./AuthImages/FilePlus.svg" : "./AuthImages/FilePlus.svg"} alt="Home" width={20} height={20} />
)

export const ChatIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "./AuthImages/Clock.svg" : "./AuthImages/Clock.svg"} alt="Utility" width={20} height={20} />
)

export const CasesIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "./AuthImages/FolderOpen.svg" : "./AuthImages/FolderOpen.svg"}
    alt="Utility"
    width={20}
    height={20}
  />
)

export const SavedCasesIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "./AuthImages/FloppyDisk.svg" : "./AuthImages/FloppyDisk.svg"}
    alt="Utility"
    width={20}
    height={20}
  />
)

export const PropertyIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "./AuthImages/BellSimple.svg" : "./AuthImages/BellSimple.svg"}
    alt="Utility"
    width={20}
    height={20}
  />
)

export const GuidelineIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "./AuthImages/Question.svg" : "./AuthImages/Question.svg"}
    alt="Utility"
    width={20}
    height={20}
  />
)

export const SupportIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "./AuthImages/Headset.svg" : "./AuthImages/Headset.svg"}
    alt="Utility"
    width={20}
    height={20}
  />
)

export const SettingsIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "./AuthImages/Gear.svg" : "./AuthImages/Gear.svg"} alt="Utility" width={20} height={20} />
)

export const LogoutsIcon = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? "./AuthImages/SignOut.svg" : "./AuthImages/SignOut.svg"}
    alt="Utility"
    width={20}
    height={20}
  />
)
