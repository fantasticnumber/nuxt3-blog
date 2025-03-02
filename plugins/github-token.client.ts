import { GithubTokenKey } from "~/utils/common/constants";
import { isDev } from "~/utils/nuxt/constants";
import { translate } from "~/utils/nuxt/i18n";
import { getLocalStorage } from "~/utils/nuxt/localStorage";
import { isAuthor } from "~/utils/nuxt/manage/github";
import { notify } from "~/utils/nuxt/notify";

export default defineNuxtPlugin(() => {
  if (isDev) {
    useGithubToken().value = "LocalServer";
    useIsAuthor().value = true;
    return;
  }

  const localToken = getLocalStorage(GithubTokenKey);
  if (localToken) {
    // 进入界面时，检查token
    isAuthor(localToken)
      .then((res) => {
        notify({
          title: res ? translate("token-verified") : translate("token-unverified"),
          type: res ? "success" : "error"
        });
        useIsAuthor().value = res;
      })
      .catch((e) => {
        notify({
          title: translate("token-unverified"),
          type: "error",
          description: e
        });
        useIsAuthor().value = false;
      });
  } else {
    useIsAuthor().value = false;
  }
});
