import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Icon, IconProps } from "@tabler/icons-react";

export type certificationType = {
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  id: string; // 一意な識別子
  name: string; // 資格名
  issuer: string; // 発行元 (例: Google, Meta, 国家機関)
  issueDate: `${number}-${number}-${number}`; // 取得日 (ISOフォーマット: YYYY-MM-DD)
  expirationDate?: string; // 有効期限 (オプション, ない場合もある)
  credentialId?: string; // 資格のID (オプション)
  credentialUrl?: string; // 認定証のURL (オプション)
  skills?: string[] // 習得スキル（オプション）
};

export type certificationsType = certificationType[];
