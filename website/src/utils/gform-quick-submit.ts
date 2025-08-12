"use server";

export interface GFromQuickSubmitFormItemProps {
  key: string;
  value: string | undefined;
}

export interface GFromQuickSubmitFormPOSTProps {
  formUrl?: "default" | string;
  data: GFromQuickSubmitFormItemProps[];
}

export interface GFromQuickSubmitFormPOSTResponses {
  success: boolean;
  error?: undefined | unknown;
}

const GFromQuickSubmitFormPOST = async (
  data: GFromQuickSubmitFormPOSTProps
): Promise<GFromQuickSubmitFormPOSTResponses> => {
  try {
    const form_url = data.formUrl || process.env.GFORM_QUICK_SUBMIT_FORM_URL;
    if (!form_url) {
      throw new Error("Form URL is not defined in environment variables.");
    }

    // URLSearchParamsを使用してフォームのデータを準備
    const query = new URLSearchParams();

    // data配列をループして、エントリーIDに対応するフォームのデータを追加
    data.data.map((item) => {
      query.append(`entry.${item.key}`, `${item.value}`);
    });

    // フォームにデータを送信
    const response = await fetch(`${form_url}/formResponse`, {
      method: "POST",
      body: query.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit the form.");
    }

    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, error };
  }
};

export { GFromQuickSubmitFormPOST };